// todo rename this, remove local
export const LocalCollapseArrow: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="collapse collapse-arrow join-item border bg-neutral-0">
      <input type="radio" name="my-accordion-4" />
      {children}
    </div>
  );
};
