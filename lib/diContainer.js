const { argsList } = require('./utils')

class DiContainer {
  constructor() {
    this.dependencies = Object.create(null)
    this.factories = Object.create(null)
  }
  factory(name, factory) {
    this.factories[name] = factory
  }
  register(name, dependency) {
    this.dependencies[name] = dependency
  }
  get(name) {
    if (!this.dependencies[name]) {
      let factory = this.factories[name]
      this.dependencies[name] = factory && this.inject(factory)
      if (!this.dependencies[name]) throw new Error('cannot find module', name)
    }
    return this.dependencies[name]
  }
  inject(factory) {
    let self = this
    let deps = argsList(factory).map(dep => self.get(dep))
    let instance = factory.apply(null, deps)
    return instance
  }
}

module.exports = new DiContainer()
