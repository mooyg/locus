import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  Home: undefined;
  UserProfile: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<StackParamList>;
export type Props = {
  navigation: ProfileScreenNavigationProp;
};
