export interface Project {
  id?: string;
  title: string;
  description?: string;
  keywords?: string;
  ownerName?: string;
  ownerId?: string;             
  paidUsers?: string[];          
  price: number;
  imageUrl: string;
  fileUrl: string;
  createdAt: any; // Timestamp
}
