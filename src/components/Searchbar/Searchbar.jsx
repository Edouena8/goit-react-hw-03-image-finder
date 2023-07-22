import React, { Component } from "react";
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import 'react-toastify/dist/ReactToastify.css';
import { 
    SearchHeader,
    Form, 
    FormButton, 
    ButtonLabel, 
    FormInput 
} from "./Searchbar.styled";

class Searchbar extends Component {

    state= {
        imageName: '',
    }

    handleNameChange = evt => {
        this.setState({
            imageName: evt.currentTarget.value.toLowerCase(),
        })
    };

    handleSubmit = evt => {
        evt.preventDefault();
        const {imageName} = this.state;
        const { onSubmit } = this.props;

        if(!imageName.trim()) {
            toast.error('Enter name of the pictures.');
            return;
        }

        onSubmit(imageName);
        this.setState({imageName: ''});
    }
    
    render() {
        const {imageName} = this.props;

        return (
            <SearchHeader>
                <Form onSubmit={this.handleSubmit}>
                    <FormButton type="submit">
                    <FcSearch width={40} height={40}/>
                    <ButtonLabel>Search</ButtonLabel>
                    </FormButton>

                    <FormInput
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={imageName}
                    onChange={this.handleNameChange}
                    />
                </Form>
            </SearchHeader>               
        )
    };
};

Searchbar.propTypes = {
    imageName: PropTypes.string,
}

export default Searchbar;
