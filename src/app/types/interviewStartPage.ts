export type conversationItem = {
    role:"system" | "user" | "assistant",
    content:string
};
export type conversationUpdateMessage ={
    type:"conversation-update",
    conversation:conversationItem[],
    message:any[],
    messagesOpenAIFormatted:any[]
};
export type vapiMessageEvent = | conversationUpdateMessage | {
    type:string,
    [key:string]:any
};

export const isConversationUpdateMessage = (message: vapiMessageEvent): message is conversationUpdateMessage => {
    return message.type === "conversation-update" && Array.isArray(message.conversation);
}