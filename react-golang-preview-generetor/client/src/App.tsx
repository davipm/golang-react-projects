import React, { FormEvent, useState, useRef } from "react";
import { useMutation } from "react-query";
import axios from "axios";

interface ImagePreview {
  screenshot: string;
}

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

async function handlePost(url: string) {
  return api.post<ImagePreview>(`/thumbnail`, { url });
}

export default function App() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const mutation = useMutation(handlePost);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!websiteUrl) {
      inputRef.current?.focus();
      return null;
    }

    mutation.mutate(websiteUrl, {
      onSuccess: ({data}) => setThumbnail(data.screenshot)
    });
  }

  return (
    <div id="app" className="container">
      <div className="row">
        <div className="content">
          <h1>Generate a thumbnail of a website</h1>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                aria-label="Enter a website"
                placeholder="Enter a website"
                className="form-control"
                ref={inputRef}
                value={websiteUrl}
                onChange={(event) => setWebsiteUrl(event.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn">
                Generate!
              </button>
            </div>
          </form>

          {mutation.isLoading && <h3>Loading...</h3>}
          {mutation.isError && <h3>Error!</h3>}

          {thumbnail && (
            <img src={thumbnail} alt="Preview" className="preview" />
          )}
        </div>
      </div>
      <small className="dev-info">build by Davi Pereira</small>
    </div>
  );
}
