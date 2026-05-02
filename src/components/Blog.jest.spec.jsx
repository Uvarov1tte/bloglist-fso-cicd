import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog.jsx'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Admin',
  url: 'abc.com',
  likes: 19
}

describe('renders content', () => {
  it('should render items', () => {
    render(<Blog blog={blog} />)

    const element = screen.getByText('Component testing is done with react-testing-library by Admin')
    expect(element).toBeDefined()
    expect(screen.getByText('abc.com')).not.toBeVisible()
    expect(screen.getByText('Likes: 19')).not.toBeVisible()
  })
})


describe('clicking the view button makes blog detail visible', () => {
  it('blog details should be visible', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Admin',
      url: 'abc.com',
      likes: 19
    }

    render(

      <Blog blog={blog} />
    )


    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('abc.com')
    const likes = screen.getByText('Likes: 19')
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
  })

})

describe('clicking the button calls event handler once', () => {
  it('event handler be called once', async () => {

    const mockHandler = jest.fn()

    render(<Blog blog={blog} updateLike={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)


    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})