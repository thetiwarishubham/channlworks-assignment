class ControllerManager {
    static async execute(action) {
        return action.execute();
    }
}

exports.ControllerManager = ControllerManager;