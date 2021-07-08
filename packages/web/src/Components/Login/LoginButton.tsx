import React from 'react';
import { motion } from 'framer-motion';
import axios from '@axios/axios';
export const LoginButton = ({ Text, Icon }: AppProps): JSX.Element => {
  return (
    <motion.a
      href="http://localhost:4000/api/auth/discord"
      whileTap={{ scale: 0.97 }}
      className="bg-darkgraysecondary text-textPrimary font-semibold flex justify-center items-center rounded-xl p-2 hover:bg-gray-600"
    >
      {Icon}
      <h2 className="mr-2 pl-3">{Text}</h2>
    </motion.a>
  );
};

interface AppProps {
  Text: string;
  Icon: JSX.Element;
}
