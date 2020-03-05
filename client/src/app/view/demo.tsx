import { connect } from "react-redux";
import { createStructuredSelector, Selector } from "reselect";

import { IPreloaderState } from "../store/reducers";
import { profileStore } from "@o-w-o/stores/profile";

import {
  Demo,
  IDemoDispatchToProps,
  IDemoStateToProps,
} from "@o-w-o/templates/demo";

const {
  getters: { $user_, loading_ },
  emitters: { fetchProfile },
} = profileStore;

const mapStateToProps: Selector<
  IPreloaderState,
  IDemoStateToProps
> = createStructuredSelector({
  $user: $user_,
  loading: loading_,
});

const mapDispatchToProps: IDemoDispatchToProps = {
  fetchProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
