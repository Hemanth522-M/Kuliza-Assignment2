import React from 'react';

import Header from './header';
import FolderIcon  from '../media/Folder.png';
import './styles.css';

class Screen1 extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            folderData: [],
            open: false,
            folderName: '',
        }
    }

    handleChange = (e) => {            
        this.setState({
            folderName: e.target.value
        })
    }

    createFolder = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    componentDidMount() {
        fetch("http://localhost:5000/folders")
        .then(res => res.json())
        .then(result => {
            this.setState({
                folderData: result
            })
        });
    }

    
    handleSubmit = () => {
        const data ={
            id: this.state.folderData.length + 1,
            name: this.state.folderName
        }
        fetch(`http://localhost:5000/folders` , {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if(response.status === 200){
                fetch("http://localhost:5000/folders")
                .then(res => res.json())
                .then(result1 => {
                    this.setState({
                        folderData: result1,
                        open: false,
                    })
                });
                return response.json();     
            }
            else if(response.status === 500){
                console.log("Something went wrong");
            }
        })
    }

    handleScreen2= (name) => {
        localStorage.setItem("folderName", name);
        window.location.href="/screen2"
    }

    render(){

        return(
            <div className="mainDiv">
                <Header />
                <div className="subDiv">
                    <h1>Hi Prithvi</h1>
                    <div className="button">
                        <button className="create" onClick={this.createFolder}>Create Folder</button>
                    </div>
                    <div>
                        {this.state.folderData.map(item=>(
                            <div className="item" key={item.id} onClick={()=>this.handleScreen2(item.name)}>
                                <input type="checkbox" className="checkbox" />&nbsp;
                                <img src={FolderIcon} id="img" alt="" />&nbsp;
                                <label className="itemName">{item.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {this.state.open &&
                    <div id="overlay">
                        <form  className="form-container">
                            <h1>Create A New Folder</h1>
                            <label for="folderName"><b>Folder Name</b></label>
                            <input type="text" placeholder="Enter a folder name" name="folderName" required onChange={this.handleChange} />
                            <button type="button" className="btn" onClick={this.handleSubmit}>Submit</button>
                            <button type="button" className="btn cancel" onClick={this.handleClose}>Cancel</button>
                        </form>
                    </div>
                }
            </div>
        )
    }
}

export default Screen1;