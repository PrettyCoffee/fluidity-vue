import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

import InputSearch from "./input-search.vue"

const mountComponent = (props: Record<string, unknown> = {}) =>
  mount(InputSearch, { props, attachTo: document.body })

describe("InputSearch", () => {
  it("renders the placeholder", () => {
    const wrapper = mountComponent({ placeholder: "Search me" })
    expect(wrapper.find("input").attributes("placeholder")).toBe("Search me")
  })

  it("sets autofocus on the input only when requested", () => {
    expect(
      mountComponent({ autofocus: true }).find("input").element.autofocus,
    ).toBeTruthy()
    expect(mountComponent().find("input").element.autofocus).toBeFalsy()
  })

  it("shows the input value from v-model", () => {
    const wrapper = mountComponent({ modelValue: "hello" })
    expect(wrapper.find("input").element.value).toBe("hello")
  })

  it("emits update:modelValue when typing", async () => {
    const wrapper = mountComponent({ modelValue: "" })
    await wrapper.find("input").setValue("abc")
    expect(wrapper.emitted("update:modelValue")).toStrictEqual([["abc"]])
  })

  it("hides the buttons while the query is empty", () => {
    const wrapper = mountComponent({ modelValue: "" })
    expect(wrapper.find("button").exists()).toBeFalsy()
  })

  it("shows the reset and submit buttons when the query is not empty", () => {
    const wrapper = mountComponent({ modelValue: "abc" })
    expect(wrapper.find("button[type=reset]").exists()).toBeTruthy()
    expect(wrapper.find("button[type=submit]").exists()).toBeTruthy()
  })

  it("emits submit with the query on form submit", async () => {
    const wrapper = mountComponent({ modelValue: "abc" })
    await wrapper.find("form").trigger("submit")
    expect(wrapper.emitted("submit")).toStrictEqual([["abc"]])
  })

  it("does not emit submit when the query is empty", async () => {
    const wrapper = mountComponent({ modelValue: "" })
    await wrapper.find("form").trigger("submit")
    expect(wrapper.emitted("submit")).toBeUndefined()
  })

  it("clears the query and focuses the input on reset", async () => {
    const wrapper = mountComponent({ modelValue: "abc" })
    await wrapper.find("button[type=reset]").trigger("click")
    expect(wrapper.emitted("update:modelValue")).toStrictEqual([[""]])
    expect(document.activeElement).toBe(wrapper.find("input").element)
  })

  it("focuses the input via the exposed focus method", () => {
    const wrapper = mountComponent()
    wrapper.vm.focus()
    expect(document.activeElement).toBe(wrapper.find("input").element)
  })
})
