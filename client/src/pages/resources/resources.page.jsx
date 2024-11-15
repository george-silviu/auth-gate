import Button from "../../components/button/button.component";

import AddIcon from "@mui/icons-material/Add";

import useRoleBasedAccess from "../../hooks/useRoleBasedAccess";

import { ROLES } from "../../utils/roles";

import "./resources.page.styles.scss";

const resources_categories = [
  {
    resource_category: "EmissionX marketing documents",
    documents: [
      { name: "doc1" },
      { name: "doc2" },
      { name: "doc3" },
      { name: "doc4" },
    ],
  },
  {
    resource_category: "ESG marketing documents",
    documents: [
      { name: "doc1" },
      { name: "doc2" },
      { name: "doc3" },
      { name: "doc4" },
      { name: "doc5" },
      { name: "doc6" },
      { name: "doc7" },
      { name: "doc8" },
      { name: "doc9" },
      { name: "doc10" },
      { name: "doc11" },
    ],
  },
];

const Resources = () => {
  const hasAccess = useRoleBasedAccess([ROLES.Superadmin]);

  return (
    <div className="resources">
      <section className="resources-actions">
        <input type="search" placeholder="Search document" />
        {hasAccess && (
          <Button
            variant="contained"
            label="Add category"
            endIcon={<AddIcon />}
          />
        )}
      </section>
      <section className="resources-content">
        {resources_categories.map((element, index) => (
          <div key={index} className="resource-category-container">
            <div className="resource-category-header">
              <h3 className="resource-category-title">
                {element.resource_category}
              </h3>
              {hasAccess && (
                <div className="resource-category-actions">
                  <a href="">Upload documents</a>

                  <a href="">Edit</a>
                  <a href="">Delete</a>
                </div>
              )}
            </div>
            <div className="resource-category-content">
              {element.documents.map((document, index) => (
                <div key={index} className="document-card">
                  {document.name}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div></div>
      </section>
    </div>
  );
};

export default Resources;
