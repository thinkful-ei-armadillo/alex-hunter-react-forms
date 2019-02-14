import React from 'react';
import AppContext from '../../AppContext';

class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            name: '',
            nameValid: false,
            nameValidationMessage: '',
        }
        this.contentInput = React.createRef();
        this.folderInput = React.createRef();
    }
    static contextType = AppContext;

    populateOptions () {
        const folders = this.context.folders.map(folder => {
            return <option key={folder.id} value={folder.id}>{folder.name}</option>
        });
        return folders;
    }

    updateName(name) {
        this.setState({name}, () => {this.validateName(name)});
    }

    validateName(name) {
        let errorMessage = this.state.nameValidationMessage;
        let error = this.state.nameValid;

        name = name.trim();
        if (name.length === 0) {
            errorMessage = 'Name must have at least 1 character';
            error = true;
        } else if (name.length > 20) {
            errorMessage = 'Name cannot be longer than 20 characters';
            error = true;
        } else {
            error = false;
            errorMessage = '';
        }

        this.setState({
            nameValid: !error,
            nameValidationMessage: errorMessage,
        });
    }

    updateContent(content) {
        this.setState({content}, () => {this.validatecontent(content)});
    }

    handleSubmit(event) {
        event.preventDefault();

        const content = this.contentInput.current.value;
        const folderId = this.folderInput.current.value;
        const { name } = this.state;
        const modified = new Date();

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({name, folderId, content, modified})
        }
        fetch('http://localhost:9090/notes', options)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Something went wrong')
                }
                return resp.json();
            })
            .then(respJson => {
                this.context.addNote(respJson);
                this.props.history.push(`/note/${respJson.id}`);
            })
            .catch(error => {
                console.log(error.message);
            });
    }
    

    render() {
        return (
            <section>
                <h2>Add Note</h2>
                <form onSubmit={(event => this.handleSubmit(event))}>
                    <div>
                        <label htmlFor="note-name-input">Name</label>
                        <input type="text" placeholder="Note name..." id="note-name-input" name="note-name-input" value={this.state.name} onChange={event => this.updateName(event.target.value)}/>
                        {(!this.state.nameValid && this.state.nameValidationMessage) && <p className="error__message">{this.state.nameValidationMessage}</p>}
                        <label htmlFor="content-input">content</label>
                        <textarea type="text" placeholder="content" id="note-content-input" name="note-content-input" ref={this.contentInput}></textarea>
                        {(!this.state.contentValid && this.state.contentValidationMessage) && <p className="error__message">{this.state.contentValidationMessage}</p>}
                        <select ref={this.folderInput}>{this.populateOptions()}</select>
                    </div>
                    <button type="submit" disabled={!this.state.nameValid}>Add Note</button>
                </form>
            </section>
        );
    }
}

export default AddNote;