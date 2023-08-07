import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import React, { createContext, useContext } from "react";

export type MessageContent = {
  message: MessageInstance;
};
export const MessageContext = createContext<MessageContent>({} as any);
export const useMessageContext = () => useContext(MessageContext);

type Props = {
  children: React.ReactNode;
};
export default function MessageProvider({ children }: Props) {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <>
      {contextHolder}
      <MessageContext.Provider value={{ message: messageApi }}>
        {children}
      </MessageContext.Provider>
    </>
  );
}
