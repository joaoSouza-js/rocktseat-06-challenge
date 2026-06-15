import { UniqueEntityId } from "./unique-entiity-id.js"

export class Entity<T> {
    readonly props: T
    private _id: UniqueEntityId

    constructor(props: T, _id?: UniqueEntityId) {
        const id = _id ?? UniqueEntityId.create()
        this.props = props
        this._id = id
    }

    get id(): UniqueEntityId {
        return this._id
    }


}