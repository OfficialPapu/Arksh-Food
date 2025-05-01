"use client";
import { useState, useRef, useEffect, createContext, useContext } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { useDescTipTap } from "./DescTipTapContext";
import { useIngredientsTipTap } from "./IngredientsTipTapContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { editor: DescEditor } = useDescTipTap();
  const { editor: IngredientsEditor } = useIngredientsTipTap();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");


  const convertObjectToFormData = (obj, formData = new FormData(), parentKey = '') => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;

        if (typeof value === 'object' && !Array.isArray(value)) {
          convertObjectToFormData(value, formData, formKey);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'object' && !Array.isArray(item)) {
              for (let subKey in item) {
                if (item.hasOwnProperty(subKey)) {
                  formData.append(`${formKey}[${index}][${subKey}]`, item[subKey]);
                }
              }
            } else {
              formData.append(`${formKey}[${index}]`, item);
            }
          });
        } else {
          formData.append(formKey, value);
        }
      }
    }
  };

  const convertBase64ToFile = (base64String, filename) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const resetForm = () => {
    setProductData({
      name: "",
      price: "",
      discountPercentage: "",
      category: "",
      isNew: false,
      isBestSeller: false,
      stock: "",
      excerpt: "",
      SEO: {
        title: "",
        description: "",
        keywords: "",
      },
    });
    setImages([]);
    DescEditor.commands.clearContent();
    IngredientsEditor.commands.clearContent();
    DescEditor.commands.setContent("<p></p>");
    IngredientsEditor.commands.setContent("<p></p>");
    DescEditor.commands.focus("end");
    IngredientsEditor.commands.focus("end");
    setActiveTab("basic");
  };




  //Media Tab
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length > 0) {
      processImageFiles(files);
    } else {
      toast.error("Please drop image files only (JPG, PNG, GIF)");
    }
  };

  const processImageFiles = (files) => {
    const newImages = [];
    let loadedCount = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push({
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          src: reader.result,
          file: file,
          name: file.name,
          size: file.size,
        });

        loadedCount++;
        if (loadedCount === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      processImageFiles(files);
    }
  };

  const removeImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
    toast.success("Image removed successfully");
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Basic Info Tab

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) { }
    };
    fetchCategories();
  }, []);

  const [productData, setProductData] = useState({
    name: "",
    excerpt: "",
    price: "",
    discountPercentage: "",
    category: "",
    isNew: false,
    isBestSeller: false,
    stock: "",
    SEO: {
      title: "",
      description: "",
      keywords: "",
    },
  });

  const validateForm = () => {
    const { name, price, category, stock } = productData;
  
    if (!name.trim()) {
      toast.error("Product name is required.");
      return false;
    }
  
    if (!price || isNaN(price) || Number(price) <= 0) {
      toast.error("Valid price is required.");
      return false;
    }
  
    if (!category) {
      toast.error("Product category is required.");
      return false;
    }
  
    if (stock && (isNaN(stock) || Number(stock) < 0)) {
      toast.error("Stock must be a non-negative number.");
      return false;
    }
  
    if (images.length === 0) {
      toast.error("At least one product image is required.");
      return false;
    }
  
    return true;
  };

  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlemetaChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      SEO: {
        ...prevData.SEO,
        [name]: value,
      },
    }));
  };

  const handleSelectChange = (name, value) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    let formData = new FormData();
    let uploadedImages = [];
    let DescEditorContent = DescEditor.getJSON();
    let IngredientsEditorContent = IngredientsEditor.getJSON();


    const extractImages = (editorContent, labelPrefix) => {
      const images = [];
      editorContent.content?.forEach((node, index) => {
        if (node.type === "image" && node.attrs.src.startsWith("data:image")) {
          const file = convertBase64ToFile(
            node.attrs.src,
            `${labelPrefix}-image-${index}.png`
          );
          formData.append("WysiwygImages", file);
          images.push({
            index,
            placeholder: node.attrs.src,
            source: labelPrefix,
          });
        }
      });
      return images;
    };

    uploadedImages = [
      ...extractImages(DescEditorContent, "Description"),
      ...extractImages(IngredientsEditorContent, "Ingredients"),
    ];



    if (uploadedImages.length > 0) {
      try {
        const response = await axios.post(`/api/admin/product/tiptap/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.success) {
          uploadedImages.forEach((img, idx) => {
            const newUrl = response.data.urls[idx];

            if (img.source === "Description") {
              DescEditorContent.content.forEach((node) => {
                if (node.type === "image" && node.attrs.src === img.placeholder) {
                  node.attrs.src = newUrl;
                }
              });
            } else if (img.source === "Ingredients") {
              IngredientsEditorContent.content.forEach((node) => {
                if (node.type === "image" && node.attrs.src === img.placeholder) {
                  node.attrs.src = newUrl;
                }
              });
            }
          });

          formData.delete("WysiwygImages");
        }
      } catch (error) {
        toast.error("Image upload failed.");
        return;
      }
    }

    formData.append("Description", DescEditor.getHTML());
    formData.append("Ingredients", IngredientsEditor.getHTML());
    convertObjectToFormData(productData, formData);
    images.forEach((image) => {
      formData.append("Images", image.file);
    });

    try {
      const response = await axios.post(`api/admin/product/new`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        resetForm();
        toast.success("Product created successfully!");
      } else {
        toast.error("Failed to create product.");
      }
    } catch (error) {
      toast.error("Failed to create product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        handleSubmit,
        isSubmitting,
        activeTab,
        setActiveTab,
        images,
        setImages,
        isDragging,
        setIsDragging,
        fileInputRef,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleImageChange,
        removeImage,
        formatFileSize,
        categories,
        productData,
        setProductData,
        handleInputChange,
        handleSelectChange,
        handlemetaChange,
      }}
    >
      {children}
    </ProductContext.Provider>
  );

};

export const useProductContext = () => useContext(ProductContext);
