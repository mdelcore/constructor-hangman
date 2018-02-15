var Letter = function(value) {
    this.value = value
    this.isVisible = value === ' ' ? true : false
}

module.exports = Letter