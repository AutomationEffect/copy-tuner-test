
import NavBar from '@/components/NavBar';
import CertificationEditor from '@/components/CertificationEditor';

const CertificationPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavBar />
      <main className="flex-grow container mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Copy Certification</h1>
          <p className="text-gray-600">
            Edit the provided copy using the COS principles to pass certification and unlock Pro Mode
          </p>
        </div>
        
        <CertificationEditor />
      </main>
    </div>
  );
};

export default CertificationPage;
