import { model, Schema } from "mongoose";
import { Family } from "../types/Family";
import autoIncrementId from "./Counter";

const familySchema = new Schema<Family>({
    id: {
        type: Number,
        unique: true,
    },

    name: {
        type: String,
        unique: true,
        required: true,
    },

    leader: {
        type: String,
        unique: true,
        required: true,
    },

    group: {
        fullName: {
            type: String,
            required: true,
            unique: true,
        }, 

        uid: {
            type: Number,
            unique: true,
            required: true,
        },
    },

    position: {
        type: Object,
        required: false,
    },

    money: {
        type: Number,
        reuqired: false,
    },
});

familySchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementId(this, 'id', next);
});

const FamilyModel = model<Family>('Family', familySchema);

export default FamilyModel;