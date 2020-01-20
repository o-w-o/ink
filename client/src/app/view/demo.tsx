import { connect } from "react-redux";
import { createStructuredSelector, Selector } from "reselect";
import { RecordOf } from "immutable";

import { IPreloaderState } from "../store/reducers";
import { profileStore } from "@o-w-o/stores/profile";

import {
  Demo,
  IDemoDispatchToProps,
  IDemoStateToProps,
} from "@o-w-o/templates/demo";

const {
  getters: { $projects_, $user_, loading_, uuid_ },
  emitters: { fetchProfile },
} = profileStore;

const mapStateToProps: Selector<
  RecordOf<IPreloaderState>,
  IDemoStateToProps
> = createStructuredSelector({
  uuid: uuid_,
  $projects: $projects_,
  $user: $user_,
  loading: loading_,
});

const mapDispatchToProps: IDemoDispatchToProps = {
  fetchProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
