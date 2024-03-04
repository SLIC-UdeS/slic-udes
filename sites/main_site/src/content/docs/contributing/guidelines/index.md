---
title: Guidelines
subtitle: Guidelines and /requirements for nf-core pipelines.
menu:
  main:
    weight: 10
---

## Introduction

The aim of nf-core is to have standardised best-practice pipelines.
To ensure this standardisation, we maintain a set of guidelines which all nf-core
pipelines must adhere to.

> If you're thinking of adding a new pipeline to nf-core or contributing to an existing pipeline, please read the documentation
> about [adding a new pipeline](adding_pipelines) and [contributing to a pipeline](contributing_to_pipelines).

The following lists an overview of the guidelines. Follow links to dedicated pages for more details about a given topic.

### Ask the community

The instructions below are subject to interpretation and specific scenarios.
If in doubt, please ask the community for feedback on the [`#new-pipelines` Slack channel](https://nfcore.slack.com/channels/new-pipelines).
You can join the nf-core Slack [here](https://nf-co.re/join).

## Requirements

All nf-core pipelines _must_ follow the following guidelines:

- Nextflow: Workflows must be built using Nextflow.
- [Identity and branding](guidelines/requirements/identity_branding): Primary development must on the nf-core organisation.
- [Workflow specificity](guidelines/requirements/workflow_specificity): There should only be a single pipeline per data / analysis type.
- [Workflow size](guidelines/requirements/workflow_size): Not too big, not too small.
- [Workflow name](guidelines/requirements/workflow_name): Names should be lower case and without punctuation.
- [Use the template](guidelines/requirements/use_the_template): All nf-core pipelines must be built using the nf-core template.
- [Software license](guidelines/requirements/mit_license): Pipelines must open source, released with the MIT license.
- [Bundled documentation](guidelines/requirements/docs): Pipeline documentation must be hosted on the nf-core website.
- [Docker support](guidelines/requirements/docker): Software must be bundled using Docker and versioned.
- [Continuous integration testing](guidelines/requirements/ci_testing): Pipelines must run CI tests.
- [Semantic versioning](guidelines/requirements/semantic_versioning): Pipelines must use stable release tags.
- [Standardised parameters](guidelines/requirements/parameters): Strive to have standardised usage.
- [Single command](guidelines/requirements/single_command): Pipelines should run in a single command.
- [Keywords](guidelines/requirements/keywords): Excellent documentation and GitHub repository keywords.
- [Pass lint tests](guidelines/requirements/linting): The pipeline must not have any failures in the `nf-core lint` tests.
- [Credits and Acknowledgements](guidelines/requirements/acknowledgements): Pipelines must properly acknowledge prior work.
- [Minimum inputs](guidelines/requirements/minimum_inputs): Pipelines should be able to run with as little input as possible.
- [Use nf-core git branches](guidelines/requirements/git_branches): Use `master`, `dev` and `TEMPLATE`.

## Recommendations

All nf-core pipelines _should_ follow the following guidelines, if possible / appropriate:

- [Use Bioconda](guidelines/recommendations/bioconda): Package software using bioconda and biocontainers.
- [File formats](guidelines/recommendations/file_formats): Use community accepted modern file formats such as `CRAM`.
- [DOIs](guidelines/recommendations/dois): Pipelines should have digital object identifiers (DOIs).
- [Cloud compatible](guidelines/recommendations/cloud_compatible): Pipelines should be tested on cloud computing environments.
- [Publication credit](guidelines/recommendations/publication_credit): Pipeline publications should acknowledge the nf-core community.

## If the guidelines don't fit

We appreciate that the above guidelines are relatively rigid and may not be for everyone.
If that's the case, there is still a lot of ways that you can get involved with nf-core!

We hope that the nf-core best practices, tooling and community are helpful for anyone building Nextflow pipelines, even if they are not a good fit for being listed as official nf-core pipelines.
You are very welcome to use the helper tools and collaborate on modules / subworkflows / ideas.
Indeed, numerous pipelines outside of nf-core now extensively use and contribute back to [nf-core/modules](https://github.com/nf-core/modules).

If using nf-core tools and especially the template, please don't call your pipeline `nf-core/<yourpipeline>`.
Please say that your pipeline _"uses"_ nf-core rather than rather than _"is"_ nf-core.
Remember that you can generate a pipeline with `nf-core create` that excludes nf-core branding.
Citation and acknowledgement of the work that goes into these tools and templates is welcome.

> Non nf-core pipelines can be added to [nextflow-io/awesome-nextflow](https://github.com/nextflow-io/awesome-nextflow) for added visibility.

If a pipeline is found to be violating the nf-core guidelines _after_ it has been added to the community, we will try to address the problems via the following steps:

1. First, the core team will attempt to resolve problems with the pipeline maintainers through discussion. Hopefully the pipeline can then be updated so that it adheres to the guidelines.
2. If this is not possible, the core team will make a recommendation to the steering committee about what action to take. Such actions could include archiving the pipeline or removing it completely.

All members of the nf-core community must adhere to the [nf-core code of conduct](https://nf-co.re/code_of_conduct).
The guidelines and actions within the code of conduct take precedence over the development pipelines described in this page.
