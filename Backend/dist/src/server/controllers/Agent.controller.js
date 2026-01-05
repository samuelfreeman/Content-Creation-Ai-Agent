import { handleUserTask } from "../../agent/taskAgent.js";
export const agent = async (req, res) => {
    const { task, content, value } = req.body;
    try {
        const result = await handleUserTask(task, content, value);
        console.log(result);
        res.send(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//# sourceMappingURL=Agent.controller.js.map