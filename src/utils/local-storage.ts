const STORE_PREFIX = "fluidity-vue/"

export class LocalStorage<T> {
  public readonly key: string

  constructor(
    key: string,
    public readonly defaultValue: T,
  ) {
    this.key = STORE_PREFIX + key
  }

  public get() {
    if (typeof window === "undefined") return this.defaultValue

    const value = window.localStorage.getItem(this.key)
    if (!value) return this.defaultValue
    try {
      return JSON.parse(value) as T
    } catch {
      return this.defaultValue
    }
  }

  public set(value: T) {
    if (typeof window === "undefined") return

    try {
      const string = JSON.stringify(value)
      window.localStorage.setItem(this.key, string)
    } catch (error) {
      console.error(
        `LocalStorage value for ${this.key} could not be parsed`,
        error,
      )
    }
  }

  public subscribe(callback: (value: T) => void) {
    const handler = (event: StorageEvent) => {
      if (event.key !== this.key) return
      callback(this.get())
    }
    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
  }
}
