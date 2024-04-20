import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
                        required: true
                    },
                    status: {
                        type: Boolean,
                        required: true
                    }
                }
            ]
        }
    ]
});

export default mongoose.model('Task', taskSchema);