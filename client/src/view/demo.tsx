import { connect } from "react-redux";
import { createStructuredSelector, Selector } from "reselect";
import { RecordOf } from "immutable";

import { IPreloaderState } from "../store/reducers";

import {
  $projects_,
  $user_,
  loading_,
  uuid_,
} from "../store/modules/profile/selectors";
import { fetchProfile } from "../store/modules/profile/epics";

import {
  Demo,
  IDemoDispatchToProps,
  IDemoStateToProps,
} from "../template/modules/demo";

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
