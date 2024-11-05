import React from "react";
import styles from "../assets/styles/Content.module.scss";
import Gallery from "./Gallery";

function Content() {
  return (
    <div className={`${styles.content} container parallax p-30`}>
      Content
      <div className={` d-flex flex-row `}>
        <div className={`${styles.box} `}>
          <Gallery />
        </div>
        <div className={` ${styles.paragraph} p-30 ml-20 `}>
          <h2>Pourquoi Fast Voiture ? </h2>
          <p>
            Fast Voiture est une application de covoiturage innovante dédiée à
            simplifier vos trajets quotidiens tout en réduisant votre empreinte
            carbone. Grâce à notre module chauffeur, Fast Voiture permet aux
            conducteurs de proposer facilement leurs trajets et de partager leur
            véhicule avec des passagers, offrant ainsi une solution économique,
            pratique et écologique pour se déplacer. Que vous soyez à la
            recherche d'une alternative rapide pour vos déplacements
            professionnels ou d'une manière plus durable de voyager, Fast
            Voiture vous connecte à des conducteurs fiables et à des passagers
            qui partagent les mêmes itinéraires, tout en garantissant une
            expérience de covoiturage fluide et sécurisée.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Content;
