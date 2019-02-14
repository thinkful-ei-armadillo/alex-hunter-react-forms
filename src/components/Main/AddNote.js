import React from 'react';
import AppContext from '../../AppContext';

class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameValid: false,
            nameValidationMessage: '',
            description: '',
        }
    }
    static contextType = AppContext;

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

    handleSubmit(event) {
        // event.preventDefault();
        // const { name } = this.state;

        // const options = {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json',
        //     },
        //     body: JSON.stringify({name})
        // }
         // fetch('http://localhost:9090/notes', options)
        //     .then(resp => {
        //         if (!resp.ok) {
        //             throw new Error('Something went wrong')
        //         }
        //         return resp.json();
        //     })
        //     .then(respJson => {
        //         this.context.addNote(respJson);
        //         this.props.history.push(`/note/${respJson.id}`);
        //     })
        //     .catch(error => {
        //         console.log(error.message);
        //     })
    }

    updateDescription(description) {
        this.setState({description}, () => {this.validateName(description)});
    }

    populateOptions () {
        const folders = this.context.folders.map(folder => {
            return <option key={folder.id} value={folder.name}>{folder.name}</option>
        });
        console.log(folders);
        return folders;
    }
    
    render() {
        return (
            <section>
                <h2>Add Note</h2>
                <form onSubmit={(event => this.handleSubmit(event))}>
                    <div>
                        <label htmlFor="note-name-input">Name</label>
                        <input type="text" placeholder="Note name..." id="note-name-input" name="note-name-input" onChange={event => this.updateName(event.target.value)}/>
                        {(!this.state.nameValid && this.state.nameValidationMessage) && <p className="error__message">{this.state.nameValidationMessage}</p>}
                        <label htmlFor="description-input">Description</label>
                        <textarea type="text" placeholder="Description" id="note-description-input" name="note-description-input" onChange={event => this.updateDescription(event.target.value)}></textarea>
                        <select>{this.populateOptions()}</select>
                    </div>
                    <button type="submit" disabled={!this.state.nameValid}>Add Note</button>
                </form>
            </section>
        );
    }
}

export default AddNote;