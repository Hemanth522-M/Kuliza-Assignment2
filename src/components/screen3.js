import React from 'react';

import Header from './header';
import FolderIcon  from '../media/Folder.png';
import './styles.css';

class Screen3 extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            folderData: [],
            open: false,
            folderName: '',
            checked: false,
            folderId: '',
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

    handleCheckbox = (id, name)=>{
        if(this.state.checked === false) {
            this.setState({
                checked: true,
                folderId: id,
                folderName: name
            })
        }
        else if(this.state.checked === true) {
            this.setState({
                checked: false,
                folderId: '',
                folderName: ''
            })
        }

    }

    componentDidMount() {
        const folderName = localStorage.getItem("folderName2");
        fetch("http://localhost:5000/folders")
            .then(res => res.json())
            .then(result => {
                var name = [folderName];
                let filterData = result.filter( el => (-1 === name.indexOf(el.name)) );
                this.setState({
                    folderData: filterData
                })
        });
    }

    handleSubmit = () => {
        const data ={
            id: this.state.folderData.length+1,
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
            }else if(response.status === 500){
                console.log("Something went wrong")
            }
        })
    }

    deleteFolder = () => {
        const id = this.state.folderId;
        const data ={
            id: this.state.folderId,
            name: this.state.folderName
        }
        fetch(`http://localhost:5000/folders/${id}` , {
            method: "DELETE",
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
                        checked: false,
                    })
                });
                return response.json();     
            }else if(response.status === 500){
                console.log("Something went wrong")
            }
        })
    }
    

    render(){
        const folderName1 = localStorage.getItem("folderName");
        const folderName2 = localStorage.getItem("folderName2");
        return(
            <div className="mainDiv">
                <Header />
                <div className="subDiv">
                    <h1>Hi Prithvi</h1>
                    <div>
                        <a href="/" className="navLink"><b>Home</b></a> > 
                        <a href="/screen2" className="navLink"><b>{folderName1}</b></a> > 
                        {folderName2}
                    </div>
                    <h1>{folderName2}</h1>
                    {this.state.checked === true ? 
                        <div className="button">
                            <button className="create" onClick={this.deleteFolder}>Delete Folder</button>
                        </div>
                        :
                        <div className="button">
                            <button className="create" onClick={this.createFolder}>Create Folder</button>
                        </div>
                    }
                    
                    <div>
                        {this.state.folderData.map(item=>(
                            <div className="item" key={item.id}>
                                <input type="checkbox" className="checkbox" id={item.id}
                                    onClick={()=>this.handleCheckbox(item.id, item.name)} defaultChecked={this.state.checked} />&nbsp;
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

export default Screen3;