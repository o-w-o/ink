import React from "react";

import { withKnobs } from "@storybook/addon-knobs";

import { createFormActions, FormEffectHooks } from "@formily/react";
import { LifeCycleTypes } from "@formily/react-schema-renderer";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  makeStyles
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

import {
  Checkbox,
  Form,
  Radio,
  Reset,
  Slider,
  Submit,
  Switch,
  TextField
} from "../components";
import { effects } from "./effects";

export default {
  title: "Form",
  decorators: [withKnobs]
};

const {
  onFormInit$,
  onFormInputChange$,
  onFieldInputChange$
} = FormEffectHooks;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 360,
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    paddingTop: theme.spacing(4)
  },
  content: {
    paddingTop: theme.spacing(4)
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  action: {
    margin: `${theme.spacing(2)}px 0`
  }
}));

const actions = createFormActions();

export const FormDemo = () => {
  const classes = useStyles();

  return (
    <Form
      actions={actions}
      effects={effects}
      initialValues={{
        name: "烛火录",
        id: 12,
        email: ""
      }}
    >
      <Card className={classes.root}>
        <CardHeader
          title="Formily with Material-UI Sample"
          subheader="made in storybook."
        />
        <CardContent className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="id"
                props={{
                  id: "id",
                  label: "ID ",
                  itemProps: {
                    fullWidth: true,
                    variant: "outlined",
                    disabled: true
                  }
                }}
                rules={[
                  {
                    format: "number",
                    message: "ID 应该是数字！",
                    required: true
                  },
                  {
                    validator: value => {
                      if (+value === 0) {
                        return {
                          type: "warning",
                          message: "ID 不能为 0"
                        };
                      }
                    }
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                props={{
                  id: "name",
                  label: "姓名",
                  itemProps: {
                    fullWidth: true,
                    variant: "outlined"
                  }
                }}
                rules={[
                  {
                    message: "姓名不能为空！",
                    required: true
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                props={{
                  id: "email",
                  label: "邮箱",
                  itemProps: {
                    variant: "outlined",
                    fullWidth: true
                  }
                }}
                required
                rules={[
                  {
                    format: "email"
                  }
                ]}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid
            container
            justify="flex-end"
            spacing={2}
            className={classes.action}
          >
            <Grid item>
              <Reset clearInitialValue={false} color="secondary" />
            </Grid>
            <Grid item>
              <Submit
                onSubmit={console.log}
                color="primary"
                variant="contained"
              >
                下一步
              </Submit>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Form>
  );
};

export const FormFullDemo = () => {
  const classes = useStyles();

  return (
    <Form
      actions={actions}
      effects={($, { setFieldState }) => {
        onFormInit$().subscribe(() => {
          console.log("初始化");
        });
        onFormInputChange$().subscribe(() => {
          console.log("输入变化 [Form]");
        });
        onFieldInputChange$().subscribe(state => {
          console.log("输入变化 [Field]", state.path, state.value);
        });
        $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, "name").subscribe(
          fieldState => {
            // setFieldState("email", state => {
            //   state.value = fieldState.value || "";
            // });
          }
        );
      }}
      initialValues={{
        name: "烛火录",
        id: 12,
        email: "",
        profile: false,
        age: 18,
        gender: "unknown"
      }}
    >
      <Card className={classes.root}>
        <CardHeader
          title="Formily with Material-UI"
          subheader="maked in storybook."
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="id"
                props={{
                  id: "id",
                  label: "ID ",
                  itemProps: {
                    variant: "outlined"
                  }
                }}
                rules={[
                  {
                    format: "number",
                    message: "ID 应该是数字！",
                    required: true
                  },
                  {
                    validator: value => {
                      if (+value === 0) {
                        return {
                          type: "warning",
                          message: "ID 不能为 0"
                        };
                      }
                    }
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                props={{
                  id: "name",
                  label: "姓名",
                  itemProps: {
                    variant: "outlined"
                  }
                }}
                rules={[
                  {
                    message: "姓名不能为空！",
                    required: true
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                props={{
                  id: "email",
                  label: "邮箱",
                  itemProps: {
                    variant: "outlined",
                    fullWidth: true
                  }
                }}
                required
                rules={[
                  {
                    format: "email"
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <Switch
                name="profile"
                props={{
                  label: "是否公开个人信息",
                  formGroupProps: {
                    row: true
                  },
                  formControlLabelProps: {
                    label: "公开个人信息"
                  },
                  formControlProps: {
                    fullWidth: true
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Radio
                name="gender"
                required
                props={{
                  label: "性别",
                  presetValues: [
                    {
                      label: "男",
                      value: "male",
                      name: "male"
                    },
                    {
                      label: "女",
                      value: "female",
                      name: "female"
                    },
                    {
                      label: "未知",
                      value: "unknown",
                      name: "unknown"
                    }
                  ]
                }}
                rules={[
                  {
                    message: "性别不能为空！",
                    required: true
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="xl"
                required
                props={{
                  id: "xl",
                  label: "学历",
                  presetValues: [
                    {
                      label: "无",
                      value: "0"
                    },
                    {
                      label: "初中生",
                      value: "1"
                    },
                    {
                      label: "高中生",
                      value: "2"
                    },
                    {
                      label: "大学生",
                      value: "3"
                    }
                  ],
                  itemProps: {
                    variant: "outlined",
                    select: true,
                    style: {
                      width: "calc(20% - 16px)"
                    }
                  }
                }}
                rules={[
                  {
                    message: "学历不能为空！",
                    required: true
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <Checkbox
                name="ai"
                required
                props={{
                  id: "ai",
                  label: "爱好",
                  presetValues: [
                    {
                      label: "敲代码",
                      name: "code",
                      value: false
                    },
                    {
                      label: "唱歌",
                      name: "sing",
                      value: false
                    },
                    {
                      label: "睡觉",
                      name: "sleep",
                      value: false
                    }
                  ]
                }}
                rules={[
                  {
                    message: "爱好不能为空！",
                    required: true
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <Slider
                name="age"
                props={{
                  label: "年龄",
                  formGroupProps: {},
                  formControlLabelProps: {
                    label: ""
                  },
                  itemProps: {
                    defaultValue: 0,
                    valueLabelDisplay: "on",
                    style: {
                      marginTop: 64
                    },
                    step: 10
                  },
                  formControlProps: {
                    fullWidth: true
                  }
                }}
                rules={[
                  {
                    message: "年龄不能为空！",
                    required: true
                  }
                ]}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify="flex-end" spacing={2}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                const result = actions.validate();
                console.log(actions.getFormState(state => state.values));
                result.then(validateResp => {
                  console.log(validateResp);
                });
              }}
            >
              校验
            </Button>

            <Submit onSubmit={console.log} color="primary" variant="outlined" />

            <Reset
              clearInitialValue={false}
              color="secondary"
              variant="outlined"
            />
          </Grid>
        </CardActions>
      </Card>
    </Form>
  );
};
