import React, { useEffect, useState, useRef } from 'react';
import GameInfo from "./GameInfo";

import MemoryCard from "./MemoryCard";

import "../../css/Loading.css";
import Utility from '../Util/utility';

function Loading(props) {
  const TYPES = ["biryani", "burger", "butter-chicken", "dessert", "dosa",
    "idly", "pasta", "pizza", "rice", "samosa"];
  console.log("= Loading Screen =")

  let loadingElement;
  const [finishedLoading, setFinishedLoading] = useState(false);

  async function generateMemoryCard(urls) {
    let images = urls.map(url => {
      return new Promise((resolve, reject) => {
        let img = new Image();

        img.onload = () => {
          resolve(img);
        }

        img.onerror = () => {
          reject(new Error("The memory card image could not be fetched."));
        }

        img.src = url;
      });
    });

    try {
      let cards = await Promise.all(images);

      return cards.map((img, index) => {
        return (<MemoryCard
          id={index}
          key={img.src}
          src={img.src}
          onClick={props.memoryCardOnClick}
        />);
      });
    } catch (error) {
      console.log(error);
    }

    // render elements to dom here, with no display initially. so they load.
    // Use onload to send a resolve inside of a promise.
    // then, when this is done,
    // finishedLoading is true in loading.
    // so it needs a promise chain.
  }

  /**
 * Generates a number of topics for use on the memory cards. Ideally,
 * we pass these off to the API when we fetch data.
 * @returns {string[]} array of valid topics to give to the API to fetch images of.
 */
  function getMemCardTypesForCurLvl() {
    let currentLevelTypes = [];
    let i = 0;

    while (i < props.numCardsForLevel) {
      let index = Math.floor(Math.random() * TYPES.length);
      console.log(index);

      if (currentLevelTypes.includes(TYPES[index])) {
        continue;
      } else {
        currentLevelTypes.push(TYPES[index]);
        i++;
      }
    }

    return currentLevelTypes;
  }

  // use this useEffect in order to perform network requests after loading.
  useEffect(() => {
    let selectedTopics = getMemCardTypesForCurLvl();

    Promise.all(selectedTopics.map((topic) => {
      console.log(topic);
      // .json() returns a promise to give data after its done processing.
      return fetch(`https://foodish-api.herokuapp.com/api/images/${topic}/`).then(resp => resp.json())
    })).then((results) => {
      let urls = results.map(result => result.image);
      console.log(urls);

      generateMemoryCard(urls).then((cards) => {
        props.passBackMemoryCards(cards);
      });

      setFinishedLoading(true);

    })
  }, []);

  function onContinueClick (event) {
    let dialog = Utility.getMatchingParent(event.target, "loading");
    
    Utility.triggerAnimation(dialog, ".fadeout", () => {
      props.playerReady();
    })
  }

  return (
    <div className="loading dialog-menu">
      {props.currentLevel === 0 &&
        <GameInfo
          numLevels={props.numLevels}
        />
      }
      {finishedLoading ?
        <div>
          <p>Level {props.currentLevel + 1} ready.</p>
          <p className="checkmark">✅</p>
        </div> :
        <div>
          <p> Getting Level {props.currentLevel + 1} ready... </p>
          <p className="hourglass rotating">⌛</p>
        </div>
      }
      <button className="continue-button" onClick={props.playerReady} disabled={!finishedLoading}>Proceed</button>
    </div>
  );
}


export default React.memo(Loading, (prevProps, nextProps) => {
  if (prevProps.currentLevel !== nextProps.currentLevel) {
    return false;
  } else {
    return true;
  }
}
);