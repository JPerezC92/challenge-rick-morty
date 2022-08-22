import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryGameDialog } from 'src/modules/memory-game/containers/MemoryGameDialog';

const onCancel = jest.fn();
const onConfirm = jest.fn();

const component = () => (
  <MemoryGameDialog
    trigger={<button>trigger</button>}
    title="Test title"
    description="Test description"
    onCancel={onCancel}
    onConfirm={onConfirm}
  />
);

describe('Test <MemoryGameDialog />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initial render should contain a button', () => {
    render(component());

    expect(screen.getByRole('button')).toHaveTextContent(/trigger/i);
  });

  test('when the button is clicked should contain a dialog', () => {
    render(component());

    const trigger = screen.getByRole('button');

    fireEvent.click(trigger);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('the dialog should contain a title, description and two buttons', () => {
    render(component());

    const trigger = screen.getByRole('button');

    fireEvent.click(trigger);

    expect(screen.getByRole('heading')).toHaveTextContent(/title/i);
    expect(screen.getByText(/description/i)).toHaveTextContent(/description/i);
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /confirm/i })
    ).toBeInTheDocument();
  });

  test('when the cancel button is clicked the dialog should be removed and the onCancel function should be called', () => {
    render(component());

    const trigger = screen.getByRole('button');

    fireEvent.click(trigger);
    const dialog = screen.getByRole('dialog');

    expect(dialog).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(dialog).not.toBeInTheDocument();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test('when the confirm button is clicked the function onConfirm should be called', () => {
    render(component());

    const trigger = screen.getByRole('button');

    fireEvent.click(trigger);
    const dialog = screen.getByRole('dialog');

    expect(dialog).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Object)
    );
  });
});
