import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userName: {
        type: String,
        ref: 'User',
        required: true,
        unique: true
    },
    tasks: [
        {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            },
            steps: [
                {
                    title: {
                        type: String,
                    },
                    status: {
                        type: Boolean,
                    }
                }
            ]
        }
    ]
});

export default mongoose.model('Task', taskSchema);