import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

import IconButton, { type IconButtonProps } from "./icon-button.vue"

const mountComponent = (props: Partial<IconButtonProps> = {}) =>
  mount(IconButton, { props: { icon: "search", label: "Search", ...props } })

describe("IconButton", () => {
  it("renders the label as visually hidden text", () => {
    const wrapper = mountComponent({ label: "Clear query" })
    expect(wrapper.find(".visually-hidden").text()).toBe("Clear query")
    expect(wrapper.text()).toBe("Clear query")
  })

  it("renders the icon", () => {
    const wrapper = mountComponent()
    const svg = wrapper.find("svg")
    expect(svg.exists()).toBeTruthy()
    expect(svg.attributes("aria-hidden")).toBe("true")
  })

  it("renders a different icon depending on the icon prop", () => {
    const search = mountComponent({ icon: "search" }).find("svg").html()
    const circleX = mountComponent({ icon: "circle-x" }).find("svg").html()
    expect(search).not.toBe(circleX)
  })

  it.each(["button", "reset", "submit"] as const)("applies type %s", type => {
    const wrapper = mountComponent({ type })
    expect(wrapper.find("button").attributes("type")).toBe(type)
  })

  it("emits click events", async () => {
    const wrapper = mountComponent()
    await wrapper.find("button").trigger("click")
    expect(wrapper.emitted("click")).toHaveLength(1)
  })
})
