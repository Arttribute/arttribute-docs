---
sidebar_position: 1
slug: /
---

# Overview

<div class="box">
    <div class="grid-container">
        <h1 class="title">Arttribute</h1>
    </div>
</div>

## Welcome to Arttribute

Welcome to the Arttribute developer documentation. Arttribute aims to empower artists while providing an ethical and transparent way for AI enthusiasts and practitioners to use artwork for generative AI applications.

## Core Components

- **[Artifacts](./artifacts)**: Individual pieces of artwork uploaded by artists with specific terms.
- **[Attributions](./attributions)**: Acknowledgments that ensure artists receive due credit and in compliance with the set terms
- **[Code-enforceable Licenses](./licenses)**: A simple standard way to grant permissions for the use of art in AI.
- **[Collections](./collections)**: Group of artifacts created by an artists licensed under the same terms.

## An overview of how it works

Arttribute is centered around attributions, ensuring that artists get proper credit when their work is used in AI. Here's how it works:

- Every uploaded artwork is uniquely marked to identify and track it.
- Artworks can be part of a collection, and each set has its terms, defined by the artist.
- If someone wants to use an artwork, they must make an attribution following the terms specified.
- Artworks can only be used if the correct attribution is in place.
- Arttribute checks for a valid attribution by the user that matches the unique artwork id.
- If a valid attribution is in place, the artwork’s use is approved, if not it’s rejected.

Here is an image that provides an overview of how it all works:

<div style={{ textAlign: 'center' }}>
  <img src={require('@site/static/img/arttribute-overview.png').default} alt="Docusaurus Logo" style={{ maxWidth: '60%', height: 'auto' }} />
</div>

## Example Usecases

### Training Fine tuned models

The following example shows the different scenarios under which the training of an AI model based on artists' artwork can be accepted or rejected.

#### Approval scenarios

If all images in a training set have the proper attribution, the model training is approved.
Model training can be approved without attributions only in scenarios where the person training the model is the owner of the artwork.

The depiction below shows the different scenarios under which model training based on artists' work is approved

<div style={{ textAlign: 'center' }}>
  <img src={require('@site/static/img/approved-training.png').default} alt="Docusaurus Logo" style={{ maxWidth: '70%', height: 'auto' }} />
</div>

#### Rejection scenarios

If one ore more images in the model training set is missing a valid attribution the model training is rejected.

The depiction below shows the different scenarios under which model training based on artists' work is rejected

<div style={{ textAlign: 'center' }}>
  <img src={require('@site/static/img/rejected-training.png').default} alt="Docusaurus Logo" style={{ maxWidth: '70%', height: 'auto' }} />
</div>
