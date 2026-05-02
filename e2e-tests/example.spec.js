const { test, describe, expect, beforeEach } = require('@playwright/test')


describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Testing admin',
        username: 'admin',
        password: 'qwerty'
      }
    })

    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()

    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('Login', () => {
    test('Can log in', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('qwerty')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Testing admin logged in')).toBeVisible()
    })

    test('Unable to log in with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('faulty')
      await page.getByTestId('password').fill('qwerty')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('admin')
      await page.getByTestId('password').fill('qwerty')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'add new blog' }).click()
      await page.getByTestId('title').fill('Test from playwright 2')
      await page.getByTestId('author').fill('playwright')
      await page.getByTestId('url').fill('aaa')
      await page.getByRole('button', { name: 'save' }).click()

      await expect(page.getByText('added new blog Test from playwright 2 by playwright', { exact: true })).toBeVisible()
    })
  })
})