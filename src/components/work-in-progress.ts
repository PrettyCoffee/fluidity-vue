import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"

import WorkInProgress from "./work-in-progress.vue"

describe("WorkInProgress", () => {
  it("renders properly", () => {
    const wrapper = mount(WorkInProgress, { props: { name: "Vitest" } })
    expect(wrapper.text()).toContain("WIP: Vitest")
  })
})
