import { useEffect, useMemo, useRef, useState } from "react"
import * as Location from "expo-location"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import BottomSheet from "@gorhom/bottom-sheet"
import Handle from "../components/SheetHandle"
import { Avatar, Button, Heading, Stack, Text, XStack, YStack } from "tamagui"
import { api } from "../client"
import { Navigation, Search } from "@tamagui/lucide-icons"
import { Settings } from "../components/Settings"
import * as TaskManager from "expo-task-manager"
import { useRealtimeLocationStore, useUserStore } from "../store"
import { CreateFamily } from "../components/CreateFamily"
import { socket } from "../socket"
import { useToastController } from "@tamagui/toast"

const REALTIME_LOCATION_TASK_NAME = "REALTIME_LOCATION"

export default function Home() {
	const toast = useToastController()

	const { setUser } = useUserStore()

	const { data: user } = api.user.get.useQuery(undefined, {
		onSuccess: async (data) => {
			console.log(data)
			if (await Location.hasStartedLocationUpdatesAsync(REALTIME_LOCATION_TASK_NAME)) {
				if (!data) {
					return new Error(
						"Some error occured, Either user isn't in a family or user doesn't exist"
					)
				}
				if (!data.familyId) {
					return
				}
				setUser({
					id: data.id,
					familyId: data.familyId,
				})
			}
		},
	})
	const bottomSheetRef = useRef<BottomSheet>(null)
	const snapPoints = useMemo(() => ["25%", "50%", "100%"], [])
	const [isSharingLocation, setIsSharingLocation] = useState<boolean>()
	const { realtimeLocation } = useRealtimeLocationStore()
	const [location, setLocation] = useState<Location.LocationObject | null>(null)

	useEffect(() => {
		; (async () => {
			const { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== "granted") {
				console.log("Didn't got permission")
			}

			const location = await Location.getCurrentPositionAsync()

			setLocation(location)

			if (!user?.familyId) return

			const isSharing = await Location.hasStartedLocationUpdatesAsync(REALTIME_LOCATION_TASK_NAME)

			setIsSharingLocation(isSharing)
		})()
	}, [user])

	const shareRealTimeLocation = async () => {
		if (!user?.familyId) {
			return toast.show("Can't share location when not in a family.")
		}
		const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync()
		if (foregroundStatus === "granted") {
			const { status: backgroundStatus, canAskAgain } =
				await Location.requestBackgroundPermissionsAsync()
			if (backgroundStatus === "granted") {
				Location.startLocationUpdatesAsync(REALTIME_LOCATION_TASK_NAME, {
					accuracy: Location.Accuracy.BestForNavigation,
					timeInterval: 5000,
					distanceInterval: 0,
				})
			} else if (!canAskAgain) {
				//TODO: Show a modal to go to the settings and enable
			}
		}
	}

	if (!location) {
		return
	}

	return (
		<YStack flex={1}>
			<MapView
				style={{
					flex: 1,
				}}
				initialRegion={{
					latitude: location?.coords.latitude,
					longitude: location?.coords.longitude,
					latitudeDelta: 0.001,
					longitudeDelta: 0.000021,
				}}
				region={{
					latitude: realtimeLocation?.coords.latitude!,
					longitude: realtimeLocation?.coords.longitude!,
					latitudeDelta: 0.001,
					longitudeDelta: 0.0021,
				}}
				provider={PROVIDER_GOOGLE}
			>
				{location && (
					<Marker
						coordinate={{
							latitude: realtimeLocation
								? realtimeLocation.coords.latitude
								: location.coords.latitude!,
							longitude: realtimeLocation
								? realtimeLocation.coords.longitude
								: location.coords.longitude!,
						}}
					></Marker>
				)}
			</MapView>
			<BottomSheet
				handleStyle={{
					backgroundColor: "#0D1E2B",
					borderTopRightRadius: 8,
					borderTopLeftRadius: 8,
				}}
				handleComponent={Handle}
				ref={bottomSheetRef}
				snapPoints={snapPoints}
			>
				<YStack flex={1} bg="$color.bg-primary">
					<XStack
						alignItems="flex-start"
						justifyContent="space-between"
						marginTop={"$4"}
						padding="$2"
					>
						<YStack alignItems="center" gap={"$1"}>
							<Avatar circular size="$6">
								<Avatar.Image src="http://placekitten.com/200/300" />
								<Avatar.Fallback bc="red" />
							</Avatar>
							<Heading color={"$color.text-primary"}>{user?.username}</Heading>
						</YStack>
						<XStack gap="$2">
							{!user?.familyId && <CreateFamily />}
							<Button
								borderColor="$color.btn-primary"
								borderWidth={"$1"}
								borderRadius="$12"
								alignItems="center"
								backgroundColor="none"
								size="$5"
								circular
							>
								<Search size={24} color="$color.text-secondary" />
							</Button>
						</XStack>
					</XStack>
					<Stack padding="$2" gap="$6">
						<Button
							bg={isSharingLocation ? "red" : "$color.btn-secondary"}
							icon={<Navigation color="white" size="24" />}
							onPress={shareRealTimeLocation}
						>
							<Text fontWeight="900" fontSize="$7" color="white">
								{isSharingLocation ? "STOP LOCATION SHARING" : "SHARE YOUR LOCATION"}
							</Text>
						</Button>
						<Settings />
					</Stack>
				</YStack>
			</BottomSheet>
		</YStack>
	)
}

TaskManager.defineTask(
	REALTIME_LOCATION_TASK_NAME,
	({
		data,
		error,
	}: {
		data: {
			locations: Location.LocationObject[]
		}

		error: TaskManager.TaskManagerError | null
	}) => {
		if (error) {
			console.log(error)
			return error
		}

		try {
			const { user } = useUserStore.getState()
			if (!user) {
				return
			}

			if (!user.familyId) {
				return
			}
			socket.connect()

			socket.emit(`user-location`, {
				coords: data.locations[0].coords,
				user: user,
			})
			useRealtimeLocationStore.setState({
				realtimeLocation: data.locations[0],
			})
		} catch (e) {
			console.log(e)
		}
	}
)
