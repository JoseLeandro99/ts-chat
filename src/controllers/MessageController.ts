export interface Imessage {
  username: string,
  date: Date,
  text: string,
}

export interface IData {
  newMessage: Imessage,
}

const messages:Imessage[] = [];

class MessageController {
  getMessages(): Array<Imessage> {
    return messages;
  }

  setMessages(data: IData): void {
    messages.push(data.newMessage);
  }
}

export default new MessageController();
