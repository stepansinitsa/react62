import { Component } from 'react';

interface NoteProps {
  id: string;
  text: string;
  onDeleteClick: () => void;
}

class Note extends Component<NoteProps> {
  render() {
    return (
      <div className="Note" id={this.props.id}>
        <p>{this.props.text}</p>
        <a
          href="#0"
          className="Note__control-delete"
          onClick={this.props.onDeleteClick.bind(this)}
        >&times;
        </a>
      </div>
    );
  }
}

export default Note;