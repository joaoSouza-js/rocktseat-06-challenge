import { UniqueEntityId } from "./unique-entity-id.js"

export abstract class Entity<T> {
    protected readonly props: T
    private _id: UniqueEntityId

    protected constructor(props: T, _id?: UniqueEntityId) {
        const id = _id ?? UniqueEntityId.create()
        this.props = props
        this._id = id
    }

    get id(): UniqueEntityId {
        return this._id
    }


}