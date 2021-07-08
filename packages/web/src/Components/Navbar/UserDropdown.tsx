import React from 'react';
import { motion } from 'framer-motion';

interface AppProps {
  dropdown: boolean;
  options: Option[];
}
interface Option {
  text: string;
  icon: JSX.Element;
  styleProp?: StyleProp;
}
interface StyleProp {
  color?: string;
}
export const UserDropdown = ({ dropdown, options }: AppProps): JSX.Element => {
  return (
    <>
      {dropdown && (
        <motion.div
          className="flex flex-col absolute m-10 top-0 right-0 bg-darkgraysecondary p-3 rounded-2xl "
          animate={{ y: 11 }}
        >
          <div className="flex flex-col">
            {options.map((item) => {
              return (
                <div className="flex items-center space-x-1 pt-2 pb-2 p-1">
                  <h2>{item.icon} </h2>
                  <h2 style={{ color: item.styleProp?.color }}>{item.text}</h2>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </>
  );
};
