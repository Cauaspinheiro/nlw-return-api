import { SubmitFeedbackUseCase } from './submit-feedback.use-case'

describe('Submit feedback', () => {
  let submitFeedbackUseCase: SubmitFeedbackUseCase
  let createFeedbackSpy: jest.Mock
  let sendMailSpy: jest.Mock

  beforeAll(() => {
    createFeedbackSpy = jest.fn()
    sendMailSpy = jest.fn()

    submitFeedbackUseCase = new SubmitFeedbackUseCase(
      {
        create: createFeedbackSpy,
      },
      { send: sendMailSpy },
    )
  })

  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedbackUseCase.run({
        type: 'BUG',
        comment: 'example comment',
        screenshot: null,
      }),
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toBeCalled()
    expect(sendMailSpy).toBeCalled()
  })

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedbackUseCase.run({
        type: '',
        comment: 'example comment',
        screenshot: null,
      }),
    ).rejects.toThrow()
  })

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedbackUseCase.run({
        type: 'BUG',
        comment: '',
        screenshot: null,
      }),
    ).rejects.toThrow()
  })

  it('should not be able to submit feedback with an invalid comment', async () => {
    await expect(
      submitFeedbackUseCase.run({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'test.jpg',
      }),
    ).rejects.toThrow()
  })
})
