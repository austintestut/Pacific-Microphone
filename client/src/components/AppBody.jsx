/* eslint-disable react/prop-types */
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import SidePanel from './SidePanel';
import MainPage from './MainPage';

class AppBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 'toneAnalyzer',
      selectedScriptIndex: null,
      showModal: false,
      title: '',
      author: '',
      scriptBody: '',
    };

    this.changeSelectedPage = this.changeSelectedPage.bind(this);
    this.changeSelectedScript = this.changeSelectedScript.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { userId } = this.props;
    const { title, author, scriptBody } = this.state;
    const objScript = {
      userId,
      title,
      author,
      scriptBody,
    };

    axios
      .post('/uploadScript', objScript)
      .catch((error) => console.error(error));

    axios
      .post('/textToneAnalysis', {text: scriptBody, title, userId})
      .then(data => console.log(data))
      .catch((error) => console.error(error));

    this.toggleModal();
  }

  toggleModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  changeSelectedPage(page) {
    this.setState({ selectedPage: page, selectedScriptIndex: null });
  }

  changeSelectedScript(index) {
    // Will need change this to display the script in the appropriate format on the page
    this.setState({ selectedScriptIndex: index });
  }

  render() {
    const { selectedPage, selectedScriptIndex, showModal } = this.state;
    const { scriptList } = this.props;
    return (
      <div id="appBody">
        <Modal id="newScriptModal" isOpen={showModal}>
          <h3>Modal title</h3>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="modalInputField">
              <label htmlFor="modalTitleInput">Title</label>
              <input
                type="text"
                id="modalTitleInput"
                required
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </div>
            <div className="modalInputField">
              <label htmlFor="modalAuthorInput">Author</label>
              <input
                type="text"
                id="modalAuthorInput"
                required
                onChange={(e) => this.setState({ author: e.target.value })}
              />
            </div>
            <div className="modalInputField">
              <label htmlFor="modalScriptInput">Script</label>
              <textarea
                id="modalScriptInput"
                required
                onChange={(e) => this.setState({ scriptBody: e.target.value })}
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={this.toggleModal}>
              Cancel
            </button>
          </form>
        </Modal>
        <SidePanel
          changeSelectedPage={this.changeSelectedPage}
          changeSelectedScript={this.changeSelectedScript}
          scriptList={scriptList}
          toggleModal={this.toggleModal}
        />
        <MainPage
          page={selectedPage}
          selectedScript={scriptList[selectedScriptIndex]}
        />
      </div>
    );
  }
}

export default AppBody;
