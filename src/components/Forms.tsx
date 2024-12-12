import React, { Component, RefObject } from 'react';

interface FormProps {
  onSubmit: (form: FormState) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  form: FormState;
}

interface FormState {
  text: string;
}

class Form extends Component<FormProps> {
  private textRef: RefObject<HTMLTextAreaElement>;

  constructor(props: FormProps) {
    super(props);
    this.textRef = React.createRef<HTMLTextAreaElement>();
  }

  componentDidUpdate(prevProps: FormProps): void {
    if (prevProps.form.text === '') {
      this.textRef.current?.focus();
    }
  }

  render(): JSX.Element {
    const {
      onSubmit: handleFormSubmit,
      onChange: handleInputChange,
      form,
    } = this.props;

    return (
      <form
        className="Form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleFormSubmit(form);
        }}
      >
        <div className="Form-control">
          <label htmlFor="text">New note</label>
          <textarea
            className="Form-control__text"
            id="text"
            name="text"
            value={form.text}
            onChange={handleInputChange}
            ref={this.textRef}
            rows={3}
            autoComplete="off"
            required
          />
        </div>
        <button
          className="Form-control__button-add"
          type="submit"
        >
          &#10148;
        </button>
      </form>
    );
  }
}

export default Form;