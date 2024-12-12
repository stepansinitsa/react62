import React, { Component } from 'react';
import Note from './components/Notes';
import Form from './components/Forms';
import initFetch from './Init';
import './App.css';

const { get, post, del } = initFetch(process.env.REACT_APP_CURRENT_URL || '');interface NoteType {
  id: string;
  text: string;
}

interface FormType {
  text: string;
}

interface AppState {
  notes: NoteType[];
  form: FormType;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      notes: [],
      form: { text: '123' },
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    get('notes/')
      .then((data: NoteType[]) => {
        this.setState({ notes: data });
      })
      .catch((error: Error) => console.log("Could not load notes", error));
  }

  componentDidUpdate(_: {}, prevState: AppState) {
    if (this.state.notes.length > prevState.notes.length) {
      window.scrollTo(0, window.outerHeight);
    }
  }

  handleFormChange({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = target;

    this.setState({ form: { ...this.state.form, [name]: value } });
  }

  handleFormSubmit(form: FormType) {
    post('notes/', { text: form.text })
      .then((data: NoteType[]) => {
        this.setState({ notes: data });
      })
      .catch((error: Error) => console.log("Could not upload the note", error));

    this.setState({ form: { text: '' } });
  }

  handleDeleteClick(id: string) {
    del(`notes/${id}`)
      .then((data: NoteType[]) => {
        this.setState({ notes: data });
      })
      .catch((error: Error) => console.log("Could not delete the note", error));
  }

  render() {
    return (
      <div className="App">
        <div className="App-wrapper">
          <h1 className="App-title">Notes</h1>
          <div className="App-notes-container">
            {this.state.notes.map((note: NoteType) => {
              return (
                <Note
                  key={note.id}
                  id={note.id}
                  text={note.text}
                  onDeleteClick={() => this.handleDeleteClick(note.id)}
                />
              );
            })}
          </div>
          <Form
            onSubmit={this.handleFormSubmit}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => this.handleFormChange(event)}
            form={this.state.form}
          />
        </div>
      </div>
    );
  }}
export default App;