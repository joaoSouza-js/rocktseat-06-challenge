import { Recipient } from "@/domain/enterprise/entities/recipient"

export class RecipientPresenter {
    static toHttp(recipient: Recipient) {
        const presenterRecipient = {
            id: recipient.id.toString(),
            name: recipient.name,
            phone: recipient.phone.value
        }

        return presenterRecipient
    }
}