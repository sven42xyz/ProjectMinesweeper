class Player {

    constructor(userId, username, userClass = 'player', score = 0) {
        this.userId = userId 
        this.username = username 
        this.userClass = userClass 
        this.score = score 
        this.color = null 
        this.disabled = false 
        this.turn = false 
        this.ready = false 
        this.state = this.stateMap.get(0) 
    }

    stateMap = new Map([
        [0, "idle"],
        [1, "ready"],
        [2, "waiting"],
        [3, "active"],
        [4, "lost"],
        [5, "won"],
    ])

    setReadyState() {
        this.ready = true 
    }

    setColorByHEX(colorHEX) {
        this.color = colorHEX 
    }

    setStateByStateId(stateId) {
        this.state = this.stateMap.get(stateId) 
    }

    setScore(score) {
        this.score += score
    }

    setUserClass(userClass) {
        this.userClass = userClass
    }

    setDisabled(bool) {
        this.disabled = bool
    }
}

module.exports = Player 