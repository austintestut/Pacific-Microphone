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
      showLPModal: false,
      userCharacter: '',
      // hard coded
      currentSentenceTones: [
        {
          score: 0.895415,
          tone_id: 'analytical',
          tone_name: 'Analytical',
        },
        {
          score: 1,
          tone_id: 'joy',
          tone_name: 'Joy',
        },
      ],
    };

    this.changeSelectedPage = this.changeSelectedPage.bind(this);
    this.changeSelectedScript = this.changeSelectedScript.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getClickedSentenceTone = this.getClickedSentenceTone.bind(this);
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
      .post('/textToneAnalysis', { text: scriptBody, title, userId })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    this.toggleModal();
  }

  // to be used as an onClick for each sentence on text analysis page
  getClickedSentenceTone(selectedSentence) {
    const { watsonAnalysis } = this.state;
    this.setState({
      currentSentenceTones: watsonAnalysis[selectedSentence],
    });
  }

  toggleLPModal() {
    const { showLPModal } = this.state;
    this.setState({ showLPModal: !showLPModal });
  }

  changeSelectedPage(page) {
    this.setState({ selectedPage: page, selectedScriptIndex: null });
  }

  changeSelectedScript(index) {
    // Will need change this to display the script in the appropriate format on the page
    this.setState({ selectedScriptIndex: index });
  }

  toggleModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  render() {
    const {
      selectedPage,
      selectedScriptIndex,
      showModal,
      showLPModal,
      currentSentenceTones,
    } = this.state;
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
        {/* <Modal id="livePerformanceModal" isOpen={showLPModal}>
          <h3>Script name</h3>
          <form
            onSubmit={() => {
              const { tmp } = this.state;
              this.setState({ userCharacter: tmp });
            }}
          >
            <select
              onChange={(e) => {
                this.setState({
                  tmp: e.target.value,
                });
              }}
            >
              {scriptList[selectedScriptIndex].characterList.map(
                (character) => (
                  <option value={character}>{character}</option>
                )
              )}
            </select>
            <button type="submit">Submit</button>
          </form>
        </Modal> */}
        <SidePanel
          changeSelectedPage={this.changeSelectedPage}
          changeSelectedScript={this.changeSelectedScript}
          scriptList={scriptList}
          toggleModal={this.toggleModal}
          selectedPage={selectedPage}
        />
        <MainPage
          page={selectedPage}
          selectedScript={scriptList[selectedScriptIndex]}
          currentSentenceTones={currentSentenceTones}
        />
      </div>
    );
  }
}

export default AppBody;
