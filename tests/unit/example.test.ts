import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

// Replace with your actual component import, e.g.:
// import MyButton from '~/components/MyButton.vue'

describe('example unit test', () => {
  it('passes a basic assertion', () => {
    expect(1 + 1).toBe(2)
  })

  // Example component mount test — uncomment once you have a component:
  //
  // it('renders MyButton', async () => {
  //   const wrapper = await mountSuspended(MyButton, {
  //     props: { label: 'Click me' },
  //   })
  //   expect(wrapper.text()).toContain('Click me')
  // })
})
