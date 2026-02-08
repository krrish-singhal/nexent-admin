import { useEffect, useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  ImageIcon,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { productApi } from "../lib/api";
import { getStockStatusBadge } from "../lib/utils";

const MAX_IMAGES = 3;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

function ProductsPage() {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productApi.getAll,
  });

  const createProductMutation = useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      toast.success("Product created successfully!");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create product");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: productApi.update,
    onSuccess: () => {
      toast.success("Product updated successfully!");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update product");
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: productApi.delete,
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [imagePreviews]);

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
    });
    setImages([]);
    setImagePreviews([]);
    setEditingProduct(null);
  };

  const closeModal = () => {
    imagePreviews.forEach((url) => {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    });
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
    });
    setImagePreviews(product.images);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > MAX_IMAGES) {
      return toast.error(`Maximum ${MAX_IMAGES} images allowed`);
    }

    const validFiles = selectedFiles.filter(
      (file) => file.type.startsWith("image/") && file.size <= MAX_IMAGE_SIZE,
    );

    if (validFiles.length !== selectedFiles.length) {
      return toast.error("Only images under 2MB are allowed");
    }

    imagePreviews.forEach((url) => {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    });

    setImages(validFiles);
    setImagePreviews(validFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editingProduct && imagePreviews.length === 0) {
      return toast.error("Please upload at least one image");
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formDataToSend.append(key, value),
    );

    if (images.length > 0) {
      images.forEach((image) => formDataToSend.append("images", image));
    }

    if (editingProduct) {
      updateProductMutation.mutate({
        id: editingProduct._id,
        formData: formDataToSend,
      });
    } else {
      createProductMutation.mutate(formDataToSend);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-base-content/70 mt-1">
            Manage your product inventory
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <PlusIcon className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {isLoading ? (
        <div className="loading loading-spinner"></div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => {
            const status = getStockStatusBadge(product.stock);
            return (
              <div key={product._id} className="card bg-base-100 shadow-xl">
                <div className="card-body flex-row items-center gap-6">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm opacity-70">{product.category}</p>
                    <div className={`badge ${status.class} mt-2`}>
                      {status.text}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="btn btn-ghost btn-square"
                    >
                      <PencilIcon />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this product?",
                          )
                        ) {
                          deleteProductMutation.mutate(product._id);
                        }
                      }}
                      className="btn btn-ghost btn-square text-error"
                    >
                      <Trash2Icon />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h3>
              <button onClick={closeModal} className="btn btn-sm btn-circle">
                <XIcon />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <input
                className="input input-bordered w-full"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />

              <input
                className="input input-bordered w-full"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="0.01"
                  className="input input-bordered w-full"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  required
                />
              </div>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="file-input w-full"
              />

              {imagePreviews.length > 0 && (
                <div className="flex gap-2">
                  {imagePreviews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="preview"
                      className="w-16 h-16 rounded object-cover"
                    />
                  ))}
                </div>
              )}

              <div className="modal-action">
                <button type="button" className="btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
