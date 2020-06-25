// Imports necessary to run a React application.
import React from "react";
import ReactDOM from "react-dom";

// The official <CKEditor> component for React.
import CKEditor from "@ckeditor/ckeditor5-react";

// The official CKEditor 5 instance inspector. It helps understand the editor view and model.
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";

// The base editor class and features required to run the editor.
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

// CKEditor plugin implementing a product widget to be used in the editor content.
import ProductPreviewEditing from "./ckeditor/productpreviewediting";

// React components to render the list of products and the product preview.
import ProductList from "./react/productlist";
import ProductPreview from "./react/productpreview";

// The React application class. It renders the editor and the product list.
class App extends React.Component {
  constructor(props) {
    super(props);

    // A place to store the reference to the editor instance created by the <CKEditor> component.
    // The editor instance is created asynchronously and is only available when the editor is ready.
    this.editor = null;

    this.state = {
      // The initial editor data. It is bound to the editor instance and will change as
      // the user types and modifies the content of the editor.
      editorData: `
                <h2>Check our last minute deals!</h2>

                <p>Aenean erat conubia pretium libero habitant turpis vivamus dignissim molestie, phasellus libero! Curae; consequat cubilia mattis. Litora non iaculis tincidunt.</p>
                <section class="product" data-id="2">&nbsp;</section>
                <p>Mollis gravida parturient ad maecenas euismod consectetur lacus rutrum urna eget ligula. Nisi imperdiet scelerisque natoque scelerisque cubilia nulla gravida. Eleifend malesuada pharetra est commodo venenatis aenean habitasse curae; fusce elit.</p>
                <section class="product" data-id="1">&nbsp;</section>

                <h3>Other deals</h3>
                <p>Ultricies dapibus placerat orci natoque fames commodo facilisi sollicitudin. Sed hendrerit mi dis non lacinia ipsum. Luctus fames scelerisque auctor pellentesque mi nunc mattis, amet sapien.</p>

                <figure class="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Our deal</th>
                                <th>Why this one?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <section class="product" data-id="3">&nbsp;</section>
                                </td>
                                <td>Nascetur, nullam hac nibh curabitur elementum. Est ridiculus turpis adipiscing erat maecenas habitant montes. Curabitur mauris ut luctus semper. Neque orci auctor luctus accumsan quam cursus purus condimentum dis?</td>
                            </tr>
                            <tr>
                                <td>
                                    <section class="product" data-id="4">&nbsp;</section>
                                </td>
                                <td>Elementum condimentum convallis porttitor cubilia consectetur cum. In pretium neque accumsan pharetra. Magna in quisque dignissim praesent facilisi diam. Ad habitant ultricies at faucibus. Ultricies auctor sodales massa nisi eget sem porta?</td>
                            </tr>
                        </tbody>
                    </table>
                </figure>
            `
    };

    // The configuration of the <CKEditor> instance.
    this.editorConfig = {
      plugins: [
        // A set of editor features to be enabled and made available to the user.
        Essentials,
        Heading,
        Bold,
        Italic,
        Underline,
        Link,
        Paragraph,
        Table,
        TableToolbar,

        // Your custom plugin implementing the widget is loaded here.
        ProductPreviewEditing
      ],
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "link",
        "insertTable",
        "|",
        "undo",
        "redo"
      ],
      // The configuration of the Products plugin. It specifies a function that will allow
      // the editor to render a React <ProductPreview> component inside a product widget.
      products: {
        preset: this.props.products,
        productRenderer: (id, domElement) => {
          const product = this.props.products.find(
            product => product.id === id
          );

          ReactDOM.render(<ProductPreview id={id} {...product} />, domElement);
        }
      }
    };

    this.handleEditorDataChange = this.handleEditorDataChange.bind(this);
    this.handleEditorInit = this.handleEditorInit.bind(this);
  }

  // A handler executed when the user types or modifies the editor content.
  // It updates the state of the application.
  handleEditorDataChange(evt, editor) {
    this.setState({
      editorData: editor.getData()
    });
  }

  // A handler executed when the editor has been initialized and is ready.
  // It synchronizes the initial data state and saves the reference to the editor instance.
  handleEditorInit(editor) {
    this.editor = editor;

    this.setState({
      editorData: editor.getData()
    });

    // CKEditor 5 inspector allows you to take a peek into the editor's model and view
    // data layers. Use it to debug the application and learn more about the editor.
    CKEditorInspector.attach(editor);
  }

  render() {
    return [
      // The application renders two columns:
      // * in the left one, the <CKEditor> and the textarea displaying live
      //   editor data are rendered.
      // * in the right column, a <ProductList> is rendered with available <ProductPreviews>
      //   to choose from.
      <div className="app__offer-editor" key="offer-editor">
        <h3>Product offer editor</h3>
        <CKEditor
          editor={ClassicEditor}
          data={this.state.editorData}
          config={this.editorConfig}
          onChange={this.handleEditorDataChange}
          onInit={this.handleEditorInit}
        />

        <h3>Editor data</h3>
        <textarea value={this.state.editorData} readOnly={true}></textarea>
      </div>,
      <ProductList
        key="product-list"
        products={this.props.products}
        onClick={id => {
          this.editor.execute("insertProduct", id);
          this.editor.editing.view.focus();
        }}
      />
    ];
  }
}

// Render the <App> in the <div class="app"></div> element found in the DOM.
ReactDOM.render(
  <App
    // Feeding the application with predefined products.
    // In a real-life application, this sort of data would be loaded
    // from a database. To keep this tutorial simple, a few
    //  hard–coded product definitions will be used.
    products={[
      {
        id: 1,
        name: "Colors of summer in Poland",
        price: "$1500",
        image: "product1.jpg"
      },
      {
        id: 2,
        name: "Mediterranean sun on Malta",
        price: "$1899",
        image: "product2.jpg"
      },
      {
        id: 3,
        name: "Tastes of Asia",
        price: "$2599",
        image: "product3.jpg"
      },
      {
        id: 4,
        name: "Exotic India",
        price: "$2200",
        image: "product4.jpg"
      }
    ]}
  />,
  document.querySelector(".app")
);
