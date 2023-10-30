export default async function onLogin (user) {
  /**
   * We can get the Wechaty bot instance from this:
   *   `const wechaty = this`
   * Or use `this` directly:
   *   `console.info(this.userSelf())`
   */
  console.log(`${user} login`)
}

